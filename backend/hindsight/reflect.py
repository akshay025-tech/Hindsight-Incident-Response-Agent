from hindsight.recall import recall_memory


def reflect_memory():
    data = recall_memory()
    return {'total_records': len(data)}
