#ifndef __LASER_STREAM__
#define __LASER_STREAM__


#include "../logs/log.cpp"
#include "./Object.cpp"

#include "../types/@package.cpp"
using namespace types;


class Flow: public Object {
    public: func tick() -> State {
        if (!points.empty()) {
            Vec<i32> point = points[0];
            points.erase(points.begin());

            return State {
                points.size() == 0,
                point[0],
                point[1],
                bool(point[2])
            };
        } else {
            return State {-1, 0, 0, 0};
        }
    }

    public: Vec<Vec<i32>> points;
};


#endif
