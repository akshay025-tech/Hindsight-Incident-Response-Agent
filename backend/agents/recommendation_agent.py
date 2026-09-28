import json


def recommend_actions(hypotheses):
    with open("data/runbooks.json", "r", encoding="utf-8") as f:
        runbooks = json.load(f)

    recommendations = []

    for hypothesis in hypotheses:
        for runbook in runbooks:
            if runbook["root_cause"] == hypothesis["cause"]:
                recommendations.extend(
                    runbook["recommended_actions"]
                )

    return list(set(recommendations))