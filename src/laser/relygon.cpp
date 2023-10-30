#ifndef __LASER_RELYGON__
#define __LASER_RELYGON__


#include <cmath>
#include "../logs/log.cpp"
#include "./Object.cpp"


class Relygon: public Object {
    public: Relygon(u16 r, u8 count) {
        this->r = r;
        this->count = count;
    }

    public: func tick() -> State override {
        step = (step + 1) % (count + 1);

        f32 angle = step * 1.0 / count * M_PI * 2;
        i32 x = round(sin(angle) * r);
        i32 y = round(cos(angle) * r);

        bool done = step == count;
        return State { done, x, y, step != 0 };
    }

    private: u16 r = 24;
    private: u8 count = 3;
    private: u8 step = 0;
};


#endif
