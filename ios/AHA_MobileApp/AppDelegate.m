#import "AppDelegate.h"
#import "RNSplashScreen.h"  
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridge.h>
#import <React/RCTRootView.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>// <- Add This Import
#import <React/RCTLinkingManager.h> // <- Add This Import
#import <Firebase.h>
#import <TwitterKit/TWTRKit.h>
#import "RNNotifications.h"
#import "RNTwitterSignIn.h"
#import <GoogleMaps/GoogleMaps.h>

 #define TWITTER_SCHEME @"twitterkit-IhNmA7kG85YS0T3ufXoioz0Iu"
#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
[GMSServices provideAPIKey:@"AIzaSyCVLxTjnoxq3vy-huFb9vfZ1wge2_a4AZE"];
[FIRApp configure];
[[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];
[RNNotifications startMonitorNotifications];
[[Twitter sharedInstance] startWithConsumerKey:@"IhNmA7kG85YS0T3ufXoioz0Iu" consumerSecret:@"ZIG7xSpoYSDSSkZjVMZlV7hVr2vIakKdJGXlKTxGYMZJFUTEoS"];
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge  moduleName:@"AHA_MobileApp"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
   [[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];
  [RNSplashScreen show];  // here



  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  return YES;
}
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [RNNotifications didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
 
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  [RNNotifications didFailToRegisterForRemoteNotificationsWithError:error];
  [[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
   [[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];
}




- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}




// - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
// {
// return [RCTLinkingManager application:application openURL:url options:options];


// }

// - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
//   sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
// {
//   return [RCTLinkingManager application:application openURL:url
//                       sourceApplication:sourceApplication annotation:annotation];
// }

// - (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
//  restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
// {
//  return [RCTLinkingManager application:application
//                   continueUserActivity:userActivity
//                     restorationHandler:restorationHandler];
// }

// - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options {
//   if ([RCTLinkingManager application:app openURL:url options:options]) {
//     return YES;
//   }
//   return NO;
// }


- (void)addButtonToKeyboard
{
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone)
    {
        // create custom button
        UIButton * doneButton = [UIButton buttonWithType:UIButtonTypeCustom];
        doneButton.frame = CGRectMake(-2, 163, 106, 53);
        doneButton.adjustsImageWhenHighlighted = NO;
        [doneButton setImage:[UIImage imageNamed:@"DoneUp.png"] forState:UIControlStateNormal];
        [doneButton setImage:[UIImage imageNamed:@"DoneDown.png"] forState:UIControlStateHighlighted];
        [doneButton addTarget:self action:@selector(saveNewLead:) forControlEvents:UIControlEventTouchUpInside];

        // locate keyboard view
        UIWindow * tempWindow = [[[UIApplication sharedApplication] windows]objectAtIndex:1];
        UIView* keyboard;
        for(int i=0; i<[tempWindow.subviews count]; i++) 
        {
            keyboard = [tempWindow.subviews objectAtIndex:i];

            // keyboard view found; add the custom button to it
            if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 3.2) {
                if([[keyboard description] hasPrefix:@"<UIPeripheralHost"] == YES)
                    [keyboard addSubview:doneButton];
            } else {
                if([[keyboard description] hasPrefix:@"<UIKeyboard"] == YES)
                    [keyboard addSubview:doneButton];
            }
        }
    }

}
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}


- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
    return YES;
  }
   if ([[url scheme] hasPrefix:@"twitter"] == YES) {
    return [[Twitter sharedInstance] application:app openURL:url options:options];
  } 

  // if ([RCTLinkingManager application:app openURL:url options:options]) {
  //   return YES;
  // }

  return NO;
  }
@end
