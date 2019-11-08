# Commands

## Remove useless stuff and upgrade Raspbian

```
sudo apt-get purge wolfram-engine scratch scratch2 nuscratch sonic-pi idle3 -y
sudo apt-get purge smartsim java-common minecraft-pi libreoffice* -y
sudo apt-get clean
sudo apt-get autoremove -y
sudo apt-get update
sudo apt-get upgrade
```

## Install required packages

```
sudo apt-get install unclutter sed
```

## Enable autologin

```
sudo raspi-config
```

- `3 Boot Options`
- `B1 Desktop / CLI`
- `B4 Desktop Autologin`

## Bash Script

```
nano /home/pi/kiosk.sh
```

```
#!/bin/bash
 
xset s noblank
xset s off
xset -dpms
 
unclutter -idle 0.5 -root &
 
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences
 
/usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk piexchange.html &
```

## Service

```
sudo nano /lib/systemd/system/kiosk.service
```

```
[Unit]
Description=Chromium Kiosk
Wants=graphical.target
After=graphical.target
 
[Service]
Environment=DISPLAY=:0
Environment=XAUTHORITY=/home/pi/.Xauthority
Type=simple
ExecStart=/bin/bash /home/pi/kiosk.sh
Restart=on-abort
User=pi
Group=pi
 
[Install]
WantedBy=graphical.target
```

## Enable & Start Service

```
sudo systemctl enable kiosk.service
sudo systemctl start kiosk.service
```

## Stop & Disable Service

```
sudo systemctl stop kiosk.service
sudo systemctl disable kiosk.service
```