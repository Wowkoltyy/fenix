#ifndef __LASER_MASTER__
#define __LASER_MASTER__


#include <Arduino.h>

#include "../devs/@package.cpp"
#include "./Object.cpp"

#include "../types/@package.cpp"
using namespace types;


class Laser {
    private: struct $Laser {
        Engine *eng;
        u8 laser;
    };

    public: Laser($Laser args) {
        this->eng = args.eng;
        this->laser = args.laser;

        pinMode(args.laser, OUTPUT);
    };

    public: func add(IList<Object*> items) {
        for (Object *item : items) {
            objs.push_back(item);
        }
    };

    public: func tick() {
        auto [done, x, y, s] = objs[ind]->tick();

        if (done != -1) {
            digitalWrite(laser, s);
            x = x * scale + xoff;
            y = y * scale + yoff;
            eng->target({ .x=x, .y=y});
        }

        ind = (ind + abs(done)) % objs.size();
    };

    public: i16 xoff = 0,
                yoff = 0;

    public: f32 scale = 0.5;

    private: Vec<Object*> objs;  // Lists of objects to draw
    private: u32 ind = 0;        // Index of current object

    private: Engine *eng;  // Laser engine
    private: u8 laser;     // Laser PIN
};


#endif
