#ifndef __LASER_OBJECT__
#define __LASER_OBJECT__


#include <Arduino.h>

#include "../types/@package.cpp"
using namespace types;


struct State {
    i32 done;
    i32 x, y;
    bool state;
};


class Object {
    public: virtual func tick() -> State = 0;
};


#endif
