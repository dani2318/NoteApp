#pragma once
#ifndef APP_HPP
#define APP_HPP

#include <windows.h>
#include <string>
#include <algorithm>

struct ApplicationInfo {
    HINSTANCE hInstance;
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
        std::wstring wClassName;
        std::wstring wWindowTitle;
};
#endif