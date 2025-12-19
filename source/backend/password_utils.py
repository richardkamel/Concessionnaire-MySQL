# password_utils.py
from passlib.hash import sha256_crypt

def hash_password(password):
    return sha256_crypt.hash(password)

def verify_password(plain_password, hashed_password):
    return sha256_crypt.verify(plain_password, hashed_password)
