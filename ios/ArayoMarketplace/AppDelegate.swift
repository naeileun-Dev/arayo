import UIKit
import React

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  var bridge: RCTBridge?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    let bridge = RCTBridge(delegate: self, launchOptions: launchOptions)
    self.bridge = bridge
    
    let rootView = RCTRootView(bridge: bridge!, moduleName: "ArayoMarketplace", initialProperties: nil)
    rootView.backgroundColor = UIColor.white
    
    window = UIWindow(frame: UIScreen.main.bounds)
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    window?.rootViewController = rootViewController
    window?.makeKeyAndVisible()
    
    return true
  }
}

extension AppDelegate: RCTBridgeDelegate {
  func sourceURL(for bridge: RCTBridge) -> URL? {
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
  }
}
