# expo-dev-menu crash on iOS 26

A blank Expo app (SDK 58, `expo-dev-client`) that shows a crash in `expo-dev-menu` on iOS 26: the app crashes in UIKit's `Gestures` framework when it gets a touch while the dev menu opens or closes.

## Run it

```sh
npm install
npx expo run:ios
```

Use an iOS 26 simulator (tested on iPhone 17, iOS 26.4). Keep the dev menu's three-finger long press on (the default).

## Reproduce

1. Shake the device (Device > Shake) to open the dev menu.
2. As soon as "Reload" is visible, while the menu is still sliding in, tap Close, then tap **Tap me**.
3. Repeat.

Expected: the menu closes and the tap count goes up.

Actual: in about half of the runs, the app crashes with `EXC_BAD_ACCESS (SIGSEGV)` on the main thread, under `-[UIGestureEnvironment _updateForEvent:window:]`.

The crashes we saw came from taps sent inside the app by a UI automation tool ([Squiggle](https://squiggle.sh)). Taps with the mouse in the simulator have not crashed it so far (0 of 9).

## Cause

`expo-dev-menu`'s `DevMenuTouchInterceptor` swizzles `UIWindow.gestureRecognizers`, and the swizzled getter moves the three-finger long-press recognizer onto each window that is asked. On iOS 26, UIKit asks windows for their recognizers while it handles a touch, so one touch moves the recognizer between the dev menu window and the app window inside one gesture update, and UIKit then uses a freed gesture object.

With the three-finger long press turned off (`EXDevMenuTouchGestureEnabled` = `false`), the crash does not happen.
