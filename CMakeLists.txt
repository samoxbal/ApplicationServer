cmake_minimum_required(VERSION 3.6)
project(VaScan)

set(CMAKE_CXX_STANDARD 14)

set(SOURCE_FILES main.cpp ApplicationServer.cpp ApplicationServer.h AppRequestHandlerFactory.cpp AppRequestHandlerFactory.h AppRequestHandler.cpp AppRequestHandler.h)
add_executable(VaScan ${SOURCE_FILES})