package io.ionic.starter;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothProfile;
import android.content.Context;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.List;

@CapacitorPlugin(name = "BluetoothManager_getConnectedDevices")
public class BluetoothManager_getConnectedDevices extends Plugin {

    @PluginMethod
    public void getConnectedDevices(PluginCall call) {
        BluetoothManager mBtManager = (BluetoothManager) getContext().getSystemService(Context.BLUETOOTH_SERVICE);

        List<BluetoothDevice> someDevices = mBtManager.getConnectedDevices(BluetoothProfile.GATT);

        JSObject ret = new JSObject();

        ret.put("devices", someDevices);
        call.resolve(ret);
    }
}
