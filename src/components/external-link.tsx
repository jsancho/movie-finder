import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from "expo-web-browser";
import { cloneElement, type ReactElement } from "react";
import { Platform } from "react-native";

interface Props {
  href: string;
  asChild?: boolean;
  children: ReactElement<{ onPress?: () => void }>;
}

export function ExternalLink({
  href,
  asChild,
  children,
}: Readonly<Props>): React.JSX.Element {
  const openExternalLink = async (): Promise<void> => {
    if (Platform.OS === "web") {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    await openBrowserAsync(href, {
      presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
    });
  };

  if (asChild) {
    return cloneElement(children, { onPress: openExternalLink });
  }

  return <>{cloneElement(children, { onPress: openExternalLink })}</>;
}
