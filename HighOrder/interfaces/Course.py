from abc import *
from dataclasses import *
from typing import *
from enum import Enum
from fields import Fields


@dataclass
class Rubric:

    isAvaliable = False
    _link: str = None

    @property
    def link(self):
        return self._link

    @link.setter
    def link(self, setlink: str):
        self.link = setlink
        self.isAvaliable = True
        return self._link

    @link.deleter
    def link(self):
        del self._link
        self._link = None
        self.isAvaliable = False


@dataclass
class Class(ABC):

    def __init__(self, course_code, worth):
        self.course_code: str = course_code
        self.worth: int = worth

    @property
    def abbr(self):
        return self.course_code[0:4]

    @property
    def code(self):
        return self.course_code[4::]

    @property
    def intensity(self):
        val = str(self.code)
        if val.startswith("3"):
            return "Basic Course"
        elif val.startswith("4"):
            return "Advance Course"
        elif val.startswith("5"):
            return "Master Course"
        elif val.startswith("6"):
            return "Doctorate Course"

    @property
    def equivalencias(self):
        pass


class Course(Class):

    prereq: List[Type[Class]] = None
    cores: List[Type[Class]] = None
    department: str = None
    rubric: Rubric()
    title: str

    def __init__(self, course_code, worth):
        super().__init__(course_code,worth)

    @property
    def requirements(self):
        self._requirements = {"Pre": self.prereq, "Co": self.cores}
        return self._requirements



