import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck, FilePlus2, Save } from 'lucide-react';
import { generatePostmortem, getPostmortem, savePostmortem } from '../api/api';
import AppHeader from '../components/AppHeader';

function Postmortem() {
    const { id } = useParams();
    const [postmortem, setPostmortem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    useEffect(() => {
        setLoading(true);
        getPostmortem(id)
            .then(setPostmortem)
            .catch((loadError) => {
                if (loadError.response?.status !== 404) setError('Postmortem could not be loaded from the API.');
                setPostmortem(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const generateDraft = async () => {
        setBusy(true);
        setError('');
        setNotice('');
        try {
            setPostmortem(await generatePostmortem(id));
            setNotice('Draft generated. Review the fields before saving your final notes.');
        } catch (generateError) {
            setError(generateError.response?.data?.detail || 'Postmortem draft could not be generated.');
        } finally {
            setBusy(false);
        }
    };

    const saveDraft = async (event) => {
        event.preventDefault();
        setBusy(true);
        setError('');
        setNotice('');
        try {
            const saved = await savePostmortem(id, {
                summary: postmortem.summary,
                root_cause: postmortem.root_cause,
                impact: postmortem.impact,
                resolution: postmortem.resolution,
                follow_up: postmortem.follow_up,
            });
            setPostmortem(saved);
            setNotice('Postmortem saved to the backend.');
        } catch (saveError) {
            setError(saveError.response?.data?.detail || 'Postmortem could not be saved.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="app-frame">
            <AppHeader active="incidents" connection={loading ? 'checking' : 'online'} />
            <main className="workspace">
                <div className="detail-toolbar">
                    <Link to={`/incident/${id}`} className="text-link"><ArrowLeft size={16} /> Incident details</Link>
                    <span className="document-status"><ClipboardCheck size={15} /> {postmortem ? 'Draft saved' : 'No draft yet'}</span>
                </div>
                <header className="page-heading postmortem-heading">
                    <div><p className="eyebrow">INCIDENT / {id}</p><h1>Postmortem</h1><p className="page-summary">{postmortem?.incident_title || 'Incident review draft'}</p></div>
                    {!postmortem && <button className="button button-primary" onClick={generateDraft} disabled={busy || loading}><FilePlus2 size={16} /> {busy ? 'Generating…' : 'Generate draft'}</button>}
                </header>
                {error && <div className="alert error" role="alert">{error}</div>}
                {notice && <div className="inline-notice" role="status">{notice}</div>}
                {loading ? <div className="loading-state">Loading postmortem…</div> : postmortem ? (
                    <form className="postmortem-form" onSubmit={saveDraft}>
                        <label className="postmortem-field field-wide">Summary<textarea required rows={3} value={postmortem.summary || ''} onChange={(event) => setPostmortem({ ...postmortem, summary: event.target.value })} /></label>
                        <label className="postmortem-field">Root cause<textarea required rows={4} value={postmortem.root_cause || ''} onChange={(event) => setPostmortem({ ...postmortem, root_cause: event.target.value })} /></label>
                        <label className="postmortem-field">Impact<textarea required rows={4} value={postmortem.impact || ''} onChange={(event) => setPostmortem({ ...postmortem, impact: event.target.value })} /></label>
                        <label className="postmortem-field">Resolution<textarea required rows={4} value={postmortem.resolution || ''} onChange={(event) => setPostmortem({ ...postmortem, resolution: event.target.value })} /></label>
                        <label className="postmortem-field">Follow-up<textarea required rows={4} value={postmortem.follow_up || ''} onChange={(event) => setPostmortem({ ...postmortem, follow_up: event.target.value })} /></label>
                        <div className="postmortem-actions"><span>Generated {postmortem.generated_at ? new Date(postmortem.generated_at).toLocaleString() : 'just now'}</span><button className="button button-primary" type="submit" disabled={busy}><Save size={16} /> {busy ? 'Saving…' : 'Save postmortem'}</button></div>
                    </form>
                ) : !error ? <section className="empty-document"><ClipboardCheck size={26} /><h2>Start the incident review</h2><p>Generate a structured draft from the incident record, then edit and save your findings.</p><button className="button button-primary" onClick={generateDraft} disabled={busy}><FilePlus2 size={16} /> {busy ? 'Generating…' : 'Generate draft'}</button></section> : null}
            </main>
        </div>
    );
}

export default Postmortem;
