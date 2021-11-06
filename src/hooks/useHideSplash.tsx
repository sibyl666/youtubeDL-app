import React, {
  useEffect
} from "react";
import RNBootSplash from "react-native-bootsplash";

export const useHideSplash = () => {
  useEffect(() => {
    RNBootSplash.hide();
  }, [])
}
