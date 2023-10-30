#ifndef __DEVS_STEPPER__
#define __DEVS_STEPPER__


#include <Arduino.h>

#include "logs/log.cpp"

#include "../types/@package.cpp"
using namespace types;


struct Stepper {

    public: i32 pos = 0, cur = 0;
    public: u32 spd = 0, acc = 0;
    public: u8 dir, step, en;

    private: struct $Stepper {
        u8 step;
        u8 dir;
        u8 en;
    };

    public: Stepper($Stepper args) {
        auto [step, dir, en] = args;

        this->step = args.step;
        this->dir = args.dir;
        this->en = args.en;

        pinMode(dir, OUTPUT);
        pinMode(step, OUTPUT);
        pinMode(en, OUTPUT);
    };

    public: func enable() -> None {
        digitalWrite(en, LOW);
    };

    public: func disable() -> None {
        digitalWrite(en, HIGH);
    };

    public: func reset() -> None {
        this->pos = 0;
        this->cur = 0;
    };

    public: func speed(u32 spd) -> None {
        this->spd = spd;
    };

    public: func acceleration(u32 acc) -> None {
        this->acc = acc;
    };

    public: func target(i32 pos) -> None {
        if (pos == cur) {
            return;
        }

        // Target position
        this->pos = pos;
        
        // Distance of braking
        i32 dist = spd * spd * 1.0 / (acc * 2);

        if (pos > cur) {
            bras = pos - dist;
        } else {
            bras = pos + dist;
        }

        brat = abs(cur - bras) * 1.0 / spd * 1'000'000;
    };

    public: func tick() -> bool {
        if (cur != pos) {
            u64 temp = micros();

            if (temp >= frame) {
                digitalWrite(dir, pos < cur);
                digitalWrite(step, HIGH);
                delayMicroseconds(10);
                digitalWrite(step, LOW);

                i32 speed = spd;
                if (pos > cur) {
                    if (acc && cur > bras) {
                        speed -= (time - brat) * acc / 1'000'000;
                    }
                    cur = cur + 1;
                } else {
                    if (acc && cur < bras) {
                        speed -= (time - brat) * acc / 1'000'000;
                    }
                    cur = cur - 1;
                }

                speed = max(1, speed);
                time += 1'000'000 / speed;
                
                u32 freq = 1'000'000 / (speed + 1);
                frame = temp + freq;
            }
            return false;
        } else {
            time = 0;
            return true;
        }
    };

    private: i64 frame = 0, // Time of next .tick()
                 time = 0;  // Time of movement

    private: i32 bras = 0,  // Position where brake starts
                 brat = 0;  // Time where brake starts
};


#endif
