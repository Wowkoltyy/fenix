#ifndef __TYPES_STUFF__
#define __TYPES_STUFF__


#include <vector>
#include <queue>

#include <map>
#include <tuple>
#include <initializer_list>
#include <functional>

#include <algorithm>

#define MLS(...)  #__VA_ARGS__
#define func auto


namespace types {
    using None = void;

    template<class T>
    using Vec = std::vector<T>;

    template<class T>
    using Queue = std::queue<T>;

    template<class K, class V>
    using Map = std::map<K, V>;

    template<class... T>
    using Tuple = std::tuple<T...>;

    template<class T>
    using IList = std::initializer_list<T>;

    template<class T>
    using Func = std::function<T>;
};


#endif
