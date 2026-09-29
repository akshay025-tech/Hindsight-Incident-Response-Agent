import { useEffect, useState } from 'react';
import { History, Search, Sparkles, X } from 'lucide-react';
import { getMemories, reflectMemory } from '../api/api';
import AppHeader from '../components/AppHeader';
import MemoryRecall from '../components/MemoryRecall';

function MemoryLibrary() {
    const [query, setQuery] = useState('');
    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reflecting, setReflecting] = useState(false);
    const [error, setError] = useState('');
    const [reflection, setReflection] = useState(null);

    const searchMemories = async (searchTerm = '') => {
        setLoading(true);
        setError('');
        try {
            setMemories(await getMemories(searchTerm));
        } catch (searchError) {
            setError('Memory could not be loaded from the API.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchMemories();
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        searchMemories(query.trim());
    };

    const handleReflect = async () => {
        setReflecting(true);
        setError('');
        try {
            const result = await reflectMemory();
            setReflection(result.total_records);
            await searchMemories(query.trim());
        } catch (reflectionError) {
            setError('Memory reflection could not be completed.');
        } finally {
            setReflecting(false);
        }
    };

    return (
        <div className="app-frame">
            <AppHeader active="memory" />
            <main className="workspace">
                <header className="page-heading">
                    <div>
                        <p className="eyebrow">LEARNING / HISTORY</p>
                        <h1>Operational memory</h1>
                        <p className="page-summary">Search lessons retained from previous incident reviews.</p>
                    </div>
                    <button className="button button-secondary" onClick={handleReflect} disabled={reflecting || loading}>
                        <Sparkles size={16} /> {reflecting ? 'Reviewing…' : 'Reflect on memory'}
                    </button>
                </header>

                {error && <div className="alert error" role="alert">{error}</div>}
                {reflection !== null && <div className="inline-notice" role="status">Memory review complete · {reflection} records</div>}

                <section className="memory-workspace">
                    <form className="memory-search" onSubmit={handleSearch}>
                        <label className="search-field">
                            <Search size={17} />
                            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search incident IDs, alert types, or lessons" aria-label="Search operational memory" />
                            {query && <button type="button" className="icon-button" onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}
                        </label>
                        <button className="button button-primary" type="submit" disabled={loading}><Search size={16} /> Search</button>
                    </form>
                    <div className="memory-results-heading">
                        <h2><History size={19} /> Retained lessons</h2>
                        <span>{loading ? 'Loading…' : `${memories.length} records`}</span>
                    </div>
                    {loading ? <div className="empty-state">Loading memory…</div> : <MemoryRecall memories={memories} />}
                </section>
            </main>
        </div>
    );
}

export default MemoryLibrary;