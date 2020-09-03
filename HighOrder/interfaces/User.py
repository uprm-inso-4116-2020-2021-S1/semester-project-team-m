from abc import *
from dataclasses import *
from typing import *
from fields import Fields


@dataclass
class User:
    name: str = None
    username: str = None
    __email: str = None
    __password: str = None
    privileges: bool = False

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, value: str = None) -> str:
        if value is not None:
            self.__email = value
        else:
            return self.__email

    @email.deleter
    def email(self):
        del self.__email
        self.__email = None

    @property
    def password(self):
        return self.__password

    @password.setter
    def password(self, change: bool):
        if change is True:
            if self.privileges is True:
                pass
            else:
                if self.password is not None:
                    enter = input("Enter password")
                    if enter == self.password:
                        pass
                else:
                    enter = input("Enter password")
                    enter = input("Enter password")


U = TypeVar('U', bound=User)


@dataclass
class Student(User):
    student_id_number: int = None
    major: Any = None

    @property
    def year_of_admission(self) -> int:
        target = str(self.student_id_number)
        if self.student_id_number is not None:

            if len(target) == 9 and target[0:3] == "802":
                return int(target[3:5])
        else:
            raise Exception("There is not a valid Student ID Number")


@dataclass
class Admin(User):

    def __init__(self):
        super().__init__()
        self.privileges = True

    """
    capable of setting up any type of user and returning it.
    """
    def new_user(self, target: Type[U]) -> U:
        return target



