#ifndef __WEB_INDEX__
#define __WEB_INDEX__

#include "SD.h"

#include "../types/@package.cpp"
using namespace types;

#include "types.cpp"


inline u16 spd = 1'200;
inline u32 acc = 0;


namespace Web {
    inline func index(Request *request) -> None {
        request->send(SD, "/assets/index.html", "text/html");
    }

    inline func config(Request *request) -> None {
        u8 count = request->params();

        for (u8 ind = 0; ind < count; ind++) {
            Parameter *param = request->getParam(ind);
            if (param->name() == "acc") {
                acc = param->value().toInt();
            }
            if (param->name() == "spd") {
                spd = param->value().toInt();
            }

            request->send(200, "text/html", "");
        }
    }
};


#endif
