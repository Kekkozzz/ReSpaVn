import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import { Link } from "react-router-dom";

export default function Platform() {
    const { platform_slug } = useParams();
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function getPlatforms() {
            console.log(platform_slug);
            
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&platform=${platform_slug}&page=${page}`);
            const json = await response.json();
            console.log(json);
            
            setPlatforms(json.results);
            setLoading(false);
        }
        getPlatforms();
    }, [platform_slug, page]);

    return (
        <>
            <Nav />
            <div className="container mt-5">
                <div className="row">

                    {loading ? (
                        <div className="fade-in mt-3">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="loader">
                                    <svg viewBox="0 0 80 80">
                                        <circle r="32" cy="40" cx="40" id="test"></circle>
                                    </svg>
                                </div>

                                <div className="loader triangle">
                                    <svg viewBox="0 0 86 80">
                                        <polygon points="43 8 79 72 7 72"></polygon>
                                    </svg>
                                </div>

                                <div className="loader">
                                    <svg viewBox="0 0 80 80">
                                        <rect height="64" width="64" y="8" x="8"></rect>
                                    </svg>
                                </div>
                            </div>
                        </div>

                    ) : (platforms.map(platform => (
                        <div className="col-12 col-md-6 d-flex justify-content-center my-3" key={platform.id}>
                            <div className="card border-0 zoom-in">
                                <Link to={`/detail/${platform.id}`}>
                                    <img src={platform.background_image} className="card-img-top" alt={platform.name} />
                                </Link>
                                <div className="card-body bg-secondario text-light">
                                    <h5 className="card-title">{platform.name}</h5>
                                </div>
                            </div>
                        </div>
                    )))
                    }

                    {loading !== true &&
                        <div className="row my-4">

                            {page !== 1 &&
                                <div className="col-6">
                                    <button className="btn btn-light" onClick={() => setPage(page - 1)}>
                                        Via indietro
                                    </button>
                                </div>
                            }
                            {page == 1 &&
                                <div className="col-12 col-6 d-flex justify-content-end">
                                    <button className="btn btn-light" onClick={() => setPage(page + 1)}>
                                        Via avanti
                                    </button>
                                </div>
                            }

                            {page > 1 &&

                                <div className="col-6 d-flex justify-content-end">
                                    <button className="btn btn-light" onClick={() => setPage(page + 1)}>
                                        Via avanti
                                    </button>
                                </div>

                            }
                        </div>
                    }
                </div>
            </div>
        </>

    )
}