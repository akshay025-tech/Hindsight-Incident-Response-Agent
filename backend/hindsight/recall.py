from hindsight.recall import recall_memory


def reflect_memory():
    memory = recall_memory()

    if not memory:
        return {
            "total_incidents": 0,
            "lessons_learned": []
        }

    lessons = []

    for item in memory:
        if "lesson" in item:
            lessons.append(item["lesson"])

    return {
        "total_incidents": len(memory),
        "lessons_learned": lessons
    }