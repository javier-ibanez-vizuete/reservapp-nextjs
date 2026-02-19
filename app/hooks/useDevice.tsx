import { useMemo } from "react";
import { useWindowWidth } from "./useWindowWidth";

export const useDevice = () => {
    const width = useWindowWidth();

    const deviceBreakPoints = useMemo(
        () => ({
            isMobile: width < 768,
            isTablet: width >= 768 && width < 1024,
            isDesktop: width >= 1024,
        }),
        [width]
    );

    return deviceBreakPoints;
};
