#ifndef __LASER_TEXT__
#define __LASER_TEXT__


#include <Arduino.h>
#include "../assets/fonts/default.cpp"

#include "./Object.cpp"

#include "../types/@package.cpp"
using namespace types;


class Text : public Object {
    public: Text(String text) {
        this->text = text;
    };

    public: func tick() -> State {
        char c = text[ind];

        step = step + 1;
        if (step == chars[c].size()) {
            ind = (ind + 1) % text.length();
            c = text[ind];
            step = 0;
        }

        u8 ss = text.length();
        i32 x = chars[c][step][0] + abs(ss / 2 - ind) * 15 * (ind < ss / 2 ? -1 : 1);
        i32 y = chars[c][step][1];
        bool s = chars[c][step][2];

        bool done = ind == text.length() - 1 and step == chars[c].size() - 1;
        return State { done, x, y, s };
    };

    private: String text;
    private: u16 ind = 0,
                 step = 0;
};


#endif
