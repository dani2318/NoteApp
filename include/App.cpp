#include <App.hpp>
#include <string>
#include <algorithm>  // ADD THIS for std::remove

// Static pointer to access the Application instance from the window procedure
static Application* g_pApp = nullptr;

// Custom window procedure
LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    switch (uMsg) {
        case WM_CLOSE:
            if (g_pApp) {
                g_pApp->shouldClose = true;
            }
            return 0;
            
        case WM_DESTROY:
            PostQuitMessage(0);
            return 0;
    }
    
    return DefWindowProc(hwnd, uMsg, wParam, lParam);
}

Application::Application(int width, int height, const char* title, ApplicationInfo infos)
    :shouldClose(false), window_info(infos), width(width), height(height), window_title(title) {
    g_pApp = this;
}

bool Application::Initialize(){
    // Helper lambda to convert string to wstring
    auto ToWideString = [](const std::string& str) -> std::wstring {
        if (str.empty()) return std::wstring();
        
        int size_needed = MultiByteToWideChar(CP_UTF8, 0, str.c_str(), -1, NULL, 0);
        std::wstring wstrTo(size_needed - 1, 0);  // -1 because size_needed includes null terminator
        MultiByteToWideChar(CP_UTF8, 0, str.c_str(), -1, &wstrTo[0], size_needed);
        return wstrTo;
    };
    
    // Remove spaces from window_title for the class name
    std::string className = std::string("window_") + window_title;
    className.erase(std::remove(className.begin(), className.end(), ' '), className.end());
    
    // Convert to wide strings
    wClassName = ToWideString(className);
    wWindowTitle = ToWideString(std::string(window_title));
    
    // Setup window class
    window_class.cbSize = sizeof(WNDCLASSEXW);
    window_class.lpfnWndProc = WindowProc;
    window_class.hInstance = window_info.hInstance;
    window_class.lpszClassName = wClassName.c_str();
    window_class.hCursor = LoadCursor(NULL, IDC_ARROW);
    window_class.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
    
    if(!RegisterClassExW(&window_class))
        return false;
    
    window_hwnd = CreateWindowExW(
        0, 
        wClassName.c_str(),
        wWindowTitle.c_str(),
        WS_OVERLAPPEDWINDOW,
        CW_USEDEFAULT,
        CW_USEDEFAULT,
        width,
        height,
        NULL,
        NULL,
        window_info.hInstance,
        NULL
    );
    
    if (window_hwnd == NULL)
        return false;
    
    ShowWindow(window_hwnd, window_info.commandShow);
    UpdateWindow(window_hwnd);
    return true;
}

void Application::run(){
    MSG msg = {};
    while (!this->shouldClose)
    {
        while(PeekMessageW(&msg, NULL, 0, 0, PM_REMOVE)){
            TranslateMessage(&msg);
            DispatchMessageW(&msg);
        }
        // Sleep here, outside the inner loop
        Sleep(1);
    }
}

Application::~Application(){
    if(window_hwnd){
        DestroyWindow(window_hwnd);
    }
    g_pApp = nullptr;
}