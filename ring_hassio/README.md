# ring-hassio
## About
A Home Assistant add-on to enable live streams of Ring Cameras. Modified with the Script seen in https://github.com/jeroenterheerdt/ring-hassio/issues/51. Thanks to [gilliginsisland](https://github.com/gilliginsisland).

This add-on wraps around [Dgreif's excellent work](https://github.com/dgreif/ring) and exposes a livestream.

> **DOT NOT run this add-on with 24-hour streaming - use this addon by starting it on-demand**

## Installation
1. Add this GitHub repository to your **supervisor** (not HACS) add-on store. 
2. Configure your Ring Refresh Token and port (see configuration below).
3. Start the "Ring Livestream" add-on. Check for errors in the logs.
4. For remote access, open up the port in your router.
5. Open the stream at rtsp://homeassistant.local:port/ring to make sure it works before going any further. We recommend using VLC or equivalent.
6. Add a camera to Home Assistant, such as:
   ```yaml
   camera:
     - platform: generic
       name: Ring Livestream
       stream_source: rtsp://homeassistant.local:port/ring
       still_image_url: http://homeassistant.local:port/public/stream.m3u8
    ```
    (Don't worry about the `still_image_url` not pointing to an actual image, we are not going to use it, but it is required.)
7. Add a card `Picture Glance` card to your UI, set the 'Camera Entity` to the camera you have just created.
8. Done! Enjoy your shiny new livestream!

## Configuration
Example configuration:
```yaml
refreshToken: your_refresh_token
camera_name: Front Door
```
* You need to create a refresh token - see https://github.com/dgreif/ring/wiki/Refresh-Tokens on how to do that. Note that you will have to have node and npm installed on your machine.
* The camera name is the name entred when setting up the camera in the Ring app.

## Taking a snapshot
Currently the addon does not support taking snapshots, but when it does this is the configuration you will need:
In order to use the `snapshot` service, you will need to following settings in your `configuration.yaml`:
   ```yaml
   homeassistant:
     whitelist_external_dirs:
       - /config/tmp
   ```
   You can then call the `snapshot` service like this:
   ```yaml
   service: camera.snapshot
   entity_id: [entityID]
   filename: tmp/foo.jpg
   ```

## Battery conservation
The stream only starts if you connect from a rtsp client
