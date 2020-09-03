import networkx as nx
from networkx import Graph
from dataclasses import *
from Course import Course
from typing import *
from abc import *

@dataclass
class Minor:

    minor_G: Graph = None
    minor_credits: int = None
    degree: str = None

@dataclass
class Major(ABC):

    major_credits: int = None
    department: str = None
    G: Graph = Graph()

class INSO(Major):

    curriculum = [
        Course("MATE3031", 4),
        Course("QUIM3131", 3),
        Course("CIIC3011", 3),
    ]


