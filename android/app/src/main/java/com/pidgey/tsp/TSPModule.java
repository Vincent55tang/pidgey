package com.pidgey.tsp;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import android.widget.Toast;

import java.util.Map;

public class TSPModule extends ReactContextBaseJavaModule {

    // Member variables

    public TSPModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // Member functions

    @ReactMethod
    public void solve(ReadableArray locations) {
        // String message = locations.getInt(0).getString("key");
        Toast.makeText(getReactApplicationContext(),"Hello",10).show();
    }

    @Override
    public String getName() {
        return "TSP";
    }
}
