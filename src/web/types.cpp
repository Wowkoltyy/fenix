#ifndef __WEB_TYPES__
#define __WEB_TYPES__


#include <ESPAsyncWebServer.h>


namespace WebSocket {
    using Server = AsyncWebSocket;
    using Client = AsyncWebSocketClient;
}

using WebServer = AsyncWebServer;
using Request = AsyncWebServerRequest;
using Parameter = AsyncWebParameter;


#endif