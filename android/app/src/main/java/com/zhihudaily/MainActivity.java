package com.zhihudaily;
import android.os.Bundle;
import android.content.SharedPreferences;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import org.devio.rn.splashscreen.SplashScreen; 
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.taumu.rnDynamicSplash.DynamicSplash;
import com.taumu.rnDynamicSplash.utils.Config;
public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SharedPreferences setting = getSharedPreferences("FirstLoad", 0);
        Boolean user_first = setting.getBoolean("FIRST", true);
          if (user_first) {// 第一次则跳转到欢迎页面
              setting.edit().putBoolean("FIRST", false).commit();
              Config splashConfig = new Config(); 
              splashConfig.setImageUrl("https://cn.bing.com/ImageResolution.aspx?w=1080&h=1920");
              splashConfig.setAutoHide(true);
              splashConfig.setAutoHideTime(0);
              new DynamicSplash(this, splashConfig);
              SplashScreen.show(this);
         } else {
            Config splashConfig = new Config(); 
            splashConfig.setImageUrl("https://cn.bing.com/ImageResolution.aspx?w=1080&h=1920");
            splashConfig.setDynamicShow(true);
            splashConfig.setAutoHideTime(3200);
            splashConfig.setAutoHide(true);
            new DynamicSplash(this, splashConfig);
         }
        super.onCreate(savedInstanceState);
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected  String getMainComponentName() {
        return "zhihuDaily";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
         @Override
         protected ReactRootView createRootView() {
            return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}