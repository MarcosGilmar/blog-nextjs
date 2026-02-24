import { useCallback, useMemo } from "react";
import { ShareConfig, SOCIAL_PROVIDERS, SocialProvider } from "./social_providers"
import { useClipboard } from "../use-clipboard";
import { Link } from "lucide-react";

type UseShareProps = ShareConfig & {
    clipboardTimeout?: number;
}

export function useShare({ url, title, text, clipboardTimeout = 2000}: UseShareProps) {

    const {handleCopy, isCopied} = useClipboard({ timeout: clipboardTimeout })

    const shareConfig = useMemo(() => ({
        url,
        ...(title && { title }), 
        ...(text && { text })
    }), [text, title, url])

    const share = useCallback((provider: SocialProvider) => {
        try {
            if(provider === 'clipboard') {
                return handleCopy(url);
            }

            const providerConfig = SOCIAL_PROVIDERS[provider];

            if(!providerConfig) {
                throw new Error(`Provider não suportado: ${provider}`);
            }

            const shareUrl = providerConfig.shareUrl(shareConfig);

            const shareWindow = window.open(shareUrl, '_blank', 'width=600, height=600, location=yes, status=yes');

            if (!shareWindow) {
                console.warn('Popup bloqueado pelo navegador');
            }

        } catch (error) {
            console.log(error);
            return false;
        }
    }, [shareConfig, handleCopy, url])
    
    const shareButtons = useMemo(() => [
        ...Object.entries(SOCIAL_PROVIDERS).map(([key, provider]) => ({
            provider: key,
            name: provider.name,
            icon: provider.icon,
            action: () => share(key as SocialProvider)
        })), {
            provider: 'clipboard',
            name: isCopied ? 'Link copiado!' : 'Copiar link',
            icon: <Link className="h-4 w-4"/>,
            action: () => share('clipboard')
        }
    ],[isCopied, share]);

    return {
        shareButtons
    }
}