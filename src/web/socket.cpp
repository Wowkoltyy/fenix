#ifndef __WEB_SOCKET__
#define __WEB_SOCKET__


#include <ESPAsyncWebServer.h>
#include "./types.cpp"

#include "../logs/log.cpp"

#include "../types/@package.cpp"
using namespace types;


enum Types {
    REAL_TIME, DRAW, POINTS, CLEAR,

    SCALE = 252,
    XOFFS = 253,
    YOFFS = 254,
    SPEED = 255,
};


namespace WSocket {
    inline WebSocket::Server socket("/ws");
    inline Vec<Func<None(u8 *data, u16 len)>> handlers(256);
    
    inline func init() -> None {        
        socket.onEvent([](
            WebSocket::Server *server,
            WebSocket::Client *client,
            AwsEventType type,
            void *arg,
            u8 *data,
            size_t len
        ) -> None {
            if (type != WS_EVT_DATA) {
                return;
            }
            stream.println("Data received");
            AwsFrameInfo *info = (AwsFrameInfo*) arg;

            if (info->final and info->index == 0 and info->len == len) {
                stream.println("Data in 1 frame");
                handlers[data[0]](data, len);
            }
        });
    }
}


#endif
