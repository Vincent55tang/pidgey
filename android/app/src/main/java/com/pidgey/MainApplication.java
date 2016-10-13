package com.pidgey;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.airbnb.android.react.maps.MapsPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;
import io.fullstack.firestack.FirestackPackage;
import com.facebook.FacebookSdk;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new MapsPackage()
          new RNGoogleSigninPackage(),
          new FirestackPackage(getApplicationContext())
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
