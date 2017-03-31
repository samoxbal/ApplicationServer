cmake_minimum_required(VERSION 3.6)
project(VaScan)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -lrt -lpthread")
set(SOURCE_FILES main.cpp src/ApplicationServer.cpp src/ApplicationServer.h src/AppRequestHandlerFactory.cpp src/AppRequestHandlerFactory.h src/AppRequestHandler.cpp src/AppRequestHandler.h src/FileHandler.cpp src/FileHandler.h)
add_executable(VaScan ${SOURCE_FILES})

set(POCO_PREFIX "/usr/local")
set(POCO_INCLUDE_DIR"${POCO_PREFIX}/include")
set(POCO_LIB_DIR "${POCO_PREFIX}/lib")
set(POCO_LIBS
        "${POCO_LIB_DIR}/libPocoNet.so"
        "${POCO_LIB_DIR}/libPocoUtil.so"
        "${POCO_LIB_DIR}/libPocoJSON.so"
        "${POCO_LIB_DIR}/libPocoFoundation.so"
        "${POCO_LIB_DIR}/libbsoncxx.so"
        "${POCO_LIB_DIR}/libmongocxx.so"
        "${POCO_LIB_DIR}/libjwtxx.a"
        "${POCO_LIB_DIR}/libjansson.a")

target_include_directories(VaScan PRIVATE $(POCO_INCLUDE_DIR))
target_link_libraries(VaScan "${POCO_LIBS}" crypto)