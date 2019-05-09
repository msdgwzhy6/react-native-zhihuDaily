//  侧栏抽屉

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerItems,
  SafeAreaView,
  withNavigationFocus
} from "react-navigation";
import AvatarPicker from "../../componetns/AvatarPicker";
import { Icon, Button, Avatar, ListItem } from "react-native-elements";
import { Tools } from "../../config";

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: "",
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.navigation.state.isDrawerOpen){
      storage
      .load({
        key: "userToken",
      })
      .then(res => {
        if(this.state.userInfo!=res){
          this.setState({
            userInfo: res
          });
        }
      })
      .catch(res => {});
    }
  }
  componentDidMount() {
   this.initUserInfo()
  }
  initUserInfo=()=>{
    storage
    .load({
      key: "userToken",
    })
    .then(res => {
      this.setState({
        userInfo: res
      });
    })
    .catch(res => {});
  }
  signUp = () => {
    try {
      storage.remove({
        key: "userToken"
      });
      this.setState({
        userInfo: ""
      });
      Tools.toast("已退出");
    } catch (error) {
      Tools.toast("程序异常，请重启应用。");
    }
  };
  updateAvatar=(res)=>{
    if(res.path){
      let imgPath=res.path;
      storage
      .save({
        key: "userToken",
        data: {
          name: "测试007",
          avatar:imgPath
        },
      })
      .then(() => {
        this.setState({
          userInfo:{
            name: "测试007",
            avatar:imgPath
          }
        })
        Tools.toast("更换成功");
      })
      .catch(err => {
        Tools.toast("更换失败");
      });
    }
  }
  selectImg(){
    this.avatarPicker.show()
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userContainer}>
          <Avatar
            rounded
            size={70}
            onPress={() => {
              this.state.userInfo.avatar?
              this.selectImg():
              this.props.navigation.navigate("Login");
            }}
            activeOpacity={0.7}
            source={
              this.state.userInfo.avatar
                ? {
                    uri: this.state.userInfo.avatar
                  }
                : require("../../assets/images/default-user-avatar.jpg")
            }
          />
          <Text style={styles.userName} numberOfLines={4}>
            {this.state.userInfo.name ? this.state.userInfo.name : "请登录"}
          </Text>
        </View>
        <View style={styles.listContainer}>
          <View>
            <ListItem
              chevron
              title={"扫一扫"}
              titleStyle={styles.itemTitle}
              leftIcon={
                <Icon
                  type="material"
                  name="crop-free"
                  size={24}
                  color="#757575"
                />
              }
            />
          </View>
          {this.state.userInfo ? (
            <Button
              type={"clear"}
              title="退出登录"
              onPress={this.signUp}
              containerStyle={styles.signUpBtn}
            />
          ) : null}
        </View>
        <AvatarPicker  ref={el => (this.avatarPicker = el)}   callback={this.updateAvatar}></AvatarPicker>
      </SafeAreaView>
    );
  }
}
export default withNavigationFocus(Drawer);
// export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userContainer: {
    backgroundColor: "#00a2ed",
    paddingHorizontal: 20,
    height: 120,
    flexDirection: "row",
    alignItems: "center"
  },
  userName: {
    flex: 1,
    marginLeft: 25,
    color: "#fff",
    fontSize: 16
  },
  itemTitle: {
    color: "#212121"
  },
  listContainer: {
    flex: 1
  },
});
