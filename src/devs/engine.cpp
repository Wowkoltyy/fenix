#ifndef __DEVS_ENGINE__
#define __DEVS_ENGINE__


#include "stepper.cpp"

#include "../logs/log.cpp"

#include "../types/@package.cpp"
using namespace types;


struct Engine {

    private: struct $Engine {
        Stepper *x, *y;
    };

    public: Engine($Engine args) {
        this->x = args.x;
        this->y = args.y;
    }

    public: func enable() -> None {
        x->enable();
        y->enable();
    }

    public: func disable() -> None {
        x->disable();
        y->disable();
    };

    public: func reset() -> None {
        x->reset();
        y->reset();
    };

    public: func speed(u32 spd) -> None {
        this->spd = spd;
    };

    public: func acceleration(u32 acc) -> None {
        this->acc = acc;
    }

    private: struct $target {
        i32 x, y;
    };

    public: func target($target args) -> None {
        u32 dx = abs(x->cur - args.x);
        u32 dy = abs(y->cur - args.y);

        if (dx == 0 && dy == 0) {
            return;
        }

        u32 hp = sqrt(dx * dx + dy * dy);

        x->acceleration(this->acc);
        x->speed(dx * 1.0 / hp * spd);
        x->target(args.x);

        y->acceleration(this->acc);
        y->speed(dy * 1.0 / hp * spd);
        y->target(args.y);
    };

    public: func tick() -> bool {
        bool xs = x->tick();
        bool ys = y->tick();
        return xs && ys;
    };

    private: Stepper *x, *y;
    private: u32 spd, acc;
};


#endif
