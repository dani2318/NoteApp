#include <App.hpp>

const wchar_t *GetWC(const char* c){
    const size_t cSize = strlen(c)+1;
    wchar_t* wc = new wchar_t[cSize];
    mbstowcs(wc, c, cSize);
    return wc;
}

Application::Application(int width, int height, const char* title, ApplicationInfo infos)
    :width(width), height(height), window_title(title), window_info(infos){

}

bool Application::Initialize(){
    LPCWSTR CLASS_NAME = GetWC(strcat("window_",window_title));
    window_class.cbSize = sizeof(WNDCLASSEXW);
    window_class.lpfnWndProc = DefWindowProc;
    window_class.hInstance = window_info.hInstance;
    window_class.lpszClassName = CLASS_NAME;
    window_class.hCursor = LoadCursor(NULL, IDC_ARROW);
    window_class.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);

    if(!RegisterClassExW(&window_class))
        return false;

    LPCWSTR ConvertedWindowTitle = GetWC(window_title);
    window_hwnd = CreateWindowExW(
        0, 
        CLASS_NAME,
        ConvertedWindowTitle,
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
            if(msg.message == WM_QUIT){
                this->shouldClose = true;
                TranslateMessage(&msg);
                DispatchMessageW(&msg);
            }
            Sleep(1);
        }
    }
    
}

Application::~Application(){
    if(window_hwnd){
        DestroyWindow(window_hwnd);
    }
}