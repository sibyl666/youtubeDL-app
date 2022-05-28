import React, { useState } from "react";
import DownloadButton from "./components/DownloadButton";
import * as Progress from "react-native-progress";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
} from "react-native";
import {
  usePermissions,
  useHideSplash,
  useButtonAnimation
} from "./hooks";
import { download, ServerData } from "./download";
import codePush from "react-native-code-push";
import axios from "axios";

const App = () => {
  useHideSplash();
  usePermissions();
  const [backgroundColor, startEffect] = useButtonAnimation();
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState("");
  const [data, setData] = useState<ServerData>();
  const [progress, setProgress] = useState(0);

  const pressHandler = async () => {
    startEffect();
    
    const [data, error] = await download(url, (res) => {
      let progress = res.bytesWritten / res.contentLength;
      setProgress(progress);
    });
    
    if (!data || error) {
      if (axios.isAxiosError(error)) {
        setMsg(error.response?.data.code ? `Kill code ${error.response?.data.code}` : error.response?.data);
      } else {
        setMsg("Unknown Error");
      }
      return;
    }

    setData(data);
  }

  return (
    <View style={style.container}>
      { data ? <Image style={style.cover} source={{ uri: data.thumbnail.url }} /> : <View style={style.cover} /> }
      <TextInput 
        style={style.input}
        onChangeText={setUrl}
        placeholder="URL"
        placeholderTextColor="#737373"
      />

      <DownloadButton onPress={pressHandler} style={{ backgroundColor }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Progress.Circle 
          size={100}
          style={style.circle}
          progress={progress}
          showsText={true}
          color="#7C3AED"
        />
        <Text style={{ color: "white", textAlign: "center" }}>{ msg }</Text>
      </View>

      <Text style={{ color: "#303030" }}>Version 1.0.4</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#171717",
    alignItems: "center",
  },
  input: {
    padding: 8,
    borderRadius: 6,
    width: "100%",
    color: "white",
    backgroundColor: "#262626",
  },
  circle: {
    marginVertical: 5
  },
  cover: {
    borderRadius: 6,
    marginBottom: 5,
    width: "100%",
    height: "20%",
    backgroundColor: "#262626",
  }
})

export default codePush({
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE
})(App);
