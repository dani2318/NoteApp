#pragma once
#include <windows.h>
struct ApplicationInfo{
    HINSTANCE hInstance;
    HINSTANCE prevInstance;
    PSTR commandLine;
    int commandShow;
};

class Application{
    public:
        Application(int width, int height, const char* title, ApplicationInfo infos);
        ~Application();
        bool Initialize();
        void run();

        bool shouldClose = false;
    private:
        ApplicationInfo window_info;
        HWND window_hwnd;
        int width, height;
        const char* window_title;
        WNDCLASSEXW window_class = {};
};