import React, {
  useEffect
} from "react";
import {
  PermissionsAndroid
} from "react-native";

export const usePermissions = () => {
  useEffect(() => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    ])
  }, [])
}
