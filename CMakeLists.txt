cmake_minimum_required(VERSION 3.6)
project(VaScan)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -lrt -lpthread")
set(SOURCE_FILES main.cpp ApplicationServer.cpp ApplicationServer.h AppRequestHandlerFactory.cpp AppRequestHandlerFactory.h AppRequestHandler.cpp AppRequestHandler.h FileHandler.cpp FileHandler.h)
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
        "${POCO_LIB_DIR}/libmongocxx.so")

target_include_directories(VaScan PRIVATE $(POCO_INCLUDE_DIR))
target_link_libraries(VaScan "${POCO_LIBS}")