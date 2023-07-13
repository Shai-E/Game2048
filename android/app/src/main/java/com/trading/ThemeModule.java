package com.trading;

import android.app.Activity;
import android.content.Context;
import android.content.Intent; // Required for theme change
import android.content.SharedPreferences; // Required for theme change
import android.preference.PreferenceManager; // Required for theme change
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ThemeModule extends ReactContextBaseJavaModule {
    public static final String THEME_PREFERENCE_KEY = "themePreference";

  public ThemeModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }
  
  @Override
  public String getName() {
    return "ThemeModule";
  }

  @ReactMethod
  public String getTheme() {
      SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(getReactApplicationContext());
      String theme = preferences.getString(ThemeModule.THEME_PREFERENCE_KEY, "dark");
      return theme;
  }

  @ReactMethod
  public void switchTheme() {
      String theme = getTheme();
      if (theme.equals("dark")){
          changeTheme("light");
      } else {
          changeTheme("dark");
      }

  }

  // Add the following method to handle theme change
  @ReactMethod
  public void changeTheme(String theme) {
    Context context = getReactApplicationContext();

    SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
    SharedPreferences.Editor editor = preferences.edit();
    editor.putString(THEME_PREFERENCE_KEY, theme);
    editor.apply();

    Activity activity = getCurrentActivity();

        if (activity != null) {
            // Apply the theme change programmatically
            if (theme.equals("light")) {
                activity.setTheme(R.style.AppTheme_Dark);
            } else {
                activity.setTheme(R.style.AppTheme_Light);
            }

            // Restart the activity to apply the new theme
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    activity.recreate();
                }
            });
        }
  }
  
}