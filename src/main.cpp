#include <windows.h>
#include <App.hpp>
#include <exception>
#include <iostream>

int APIENTRY WinMain(HINSTANCE hInstance, HINSTANCE prevHinstance, PSTR cmdLine, int cmdShow){
    ApplicationInfo windowInfo;
    windowInfo.hInstance = hInstance;
    windowInfo.prevInstance = prevHinstance;
    windowInfo.commandLine = cmdLine;
    windowInfo.commandShow = cmdShow;

    Application* app = new Application(1280, 720, "Main_Window", windowInfo);
    app->Initialize();
    try{
        app->run();
    }catch(std::exception &e){
        std::cerr << e.what() << std::endl;
        return -1;
    }

    delete app;

    return 0;
}
