import json
from pathlib import Path

RUNBOOKS_FILE = Path(__file__).resolve().parent.parent / 'data' / 'runbooks.json'


def recommend_action():
    return 'restart service'


def recommend_actions(hypotheses):
    with RUNBOOKS_FILE.open('r', encoding='utf-8') as f:
        runbooks = json.load(f)

    recommendations = []

    for hypothesis in hypotheses:
        cause = str(hypothesis.get('cause', '')).lower().replace(' ', '_')
        for runbook in runbooks:
            issue = str(runbook.get('root_cause') or runbook.get('issue') or runbook.get('cause') or '').lower().replace(' ', '_')
            if issue == cause:
                actions = runbook.get('recommended_actions') or runbook.get('action')
                if isinstance(actions, list):
                    recommendations.extend(actions)
                elif actions:
                    recommendations.append(actions)

    unique = list(dict.fromkeys(recommendations))
    return unique or [recommend_action()]
