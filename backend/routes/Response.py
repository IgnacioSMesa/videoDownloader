from flask import Flask, request

class Response:
    @staticmethod
    def success(message):
        return {"message": message}, 200
    
    @staticmethod
    def error(message="Internal server error", status=500):
        return {"error": message}, status


