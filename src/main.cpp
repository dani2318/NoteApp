#include <Windows.h>
#include <App.hpp>
#include <iostream>

int APIENTRY WinMain(HINSTANCE hInstance, HINSTANCE prevHinstance, PSTR cmdLine, int cmdShow){
    ApplicationInfo windowInfo;
    windowInfo.hInstance = hInstance;
    windowInfo.commandShow = cmdShow;
    
    Application* app = new Application(1280, 720, "Main Window", windowInfo);
    if (!app->Initialize()) {
        delete app;
        return -1;
    }
    
    try{
        app->run();
    }catch(std::exception &e){
        std::cerr << e.what() << std::endl;
        delete app;
        return -1;
    }
    
    delete app;
    return 0;
}