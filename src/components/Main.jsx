import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Info from "./Info";
import { BsFillEmojiDizzyFill } from "react-icons/bs";
import { LuLoader2 } from "react-icons/lu";
import { MdOutlineSearchOff } from "react-icons/md";

function Main() {
  const [array, setArray] = useState([]);
  const [trending, settrending] = useState([]);
  const [input, setInput] = useState("");
  const [itemselect, setItemselect] = useState("movie");
  const [itemselect3, setItemselect3] = useState("movie");
  const [itemselect2, setItemselect2] = useState("Escolha");
  const [display, setDisplay] = useState("none");
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(true);
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 850,
        settings: {
          dots: false,
        },
      },
    ],
  });

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const key =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTQ5MTM1Y2I5MjU5NTBlZDU1MTYyMzZmYTdlNjVjMCIsIm5iZiI6MTczMTg3MDM3NC4xMDE1NjQ2LCJzdWIiOiI2NzNhMzIzNjZhMDJhMjRkN2IyMThkYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WcHIfD1IVyQhRUmJG3DTfWn6QiWQs--bNveXpbKhjrw";

  const handleSearch = async () => {
    setIsLoading(true);
    const formatedquery = encodeURIComponent(input);
    let url = `https://api.themoviedb.org/3/search/${itemselect}?query=${formatedquery}&include_adult=false&language=pt-BR&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + key,
      },
    };

    try {
      const result = await fetch(url, options);
      const data = await result.json();
      setArray(data.results || []);
      setItemselect3(itemselect);
      setHasResults(data.results && data.results.length > 0);
      setSettings((prevsettings) => {
        return {
          ...prevsettings,
          infinite: data.results.length > 1 ? true : false,
        };
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setHasResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.themoviedb.org/3/trending/movie/week?language=pt-BR";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + key,
        },
      };
      const result = await fetch(url, options);
      const data = await result.json();
      settrending(data.results || []);
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplay("block");
  };

  const handle_atributtes2 = () => {
    if (itemselect3 == "person") {
      return array.map((item) => (
        <Info>
          <h1 className="text-3xl mb-3">{item.name}</h1>
          {item.profile_path == null ? (
            <div className="mb-5">{"Sem Imagem"}</div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt="Poster"
              className="h-[60vh] max-sm:w-full mt-6 rounded-lg max-sm:h-[40vh]"
            />
          )}
          <div className="text-lg w-fit p-2 bg-black/[0.4] flex flex-col">
            Conhecido por:
            {item.known_for.map((item2) => (
              <p className="text-[13px]">{item2.title}</p>
            ))}
          </div>
        </Info>
      ));
    } else if (itemselect3 == "collection") {
      return array.map((item) => (
        <Info>
          <h1 className="text-3xl mb-3">{item.name}</h1>
          <h2>{item.overview}</h2>
          {item.poster_path == null ? (
            <div className="mb-5">{"Sem Imagem"}</div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt="Poster"
              className="h-[60vh] max-sm:w-full mt-6 rounded-lg max-sm:h-[40vh]"
            />
          )}
        </Info>
      ));
    } else if (itemselect3 == "movie") {
      return array.map((item) => (
        <Info>
          <h1 className="text-3xl mb-3">{item.title}</h1>
          <h2>{item.overview}</h2>
          <h2 className="mt-4">
            <span className="font-bold text-xl">Data Lançamento: </span>
            {item.release_date}
          </h2>
          {item.poster_path == null ? (
            <div className="mb-5">{"Sem Imagem"}</div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt="Poster"
              className="h-[60vh] max-sm:w-full mt-6 rounded-lg max-sm:h-[40vh]"
            />
          )}
        </Info>
      ));
    } else {
      return array.map((item) => (
        <Info>
          <h1 className="text-3xl mb-3">{item.name}</h1>
          <h2>{item.overview}</h2>
          <h2 className="mt-4">
            <span className="font-bold text-xl">Data Lançamento: </span>
            {item.first_air_date}
          </h2>
          {item.poster_path == null ? (
            <div className="mb-5">{"Sem Imagem"}</div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt="Poster"
              className="h-[60vh] max-sm:w-full mt-6 rounded-lg max-sm:h-[40vh]"
            />
          )}
        </Info>
      ));
    }
  };

  return (
    <main className="min-w-screen relative overflow-hidden min-h-screen h-fit bg-black flex items-center flex-col p-5 gap-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-20 z-50 w-fit h-fit mt-5 justify-around items-center max-sm:w-screen max-sm:justify-center max-sm:gap-2 max-sm:scale-[0.7]"
      >
        <Dropdown className="max-sm:scale-[1.2] z-50">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {itemselect2}
          </Dropdown.Toggle>
          <Dropdown.Menu className="z-50">
            <Dropdown.Item
              onClick={() => {
                setItemselect("movie");
                setItemselect2("Filmes");
              }}
            >
              Filmes
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setItemselect("tv");
                setItemselect2("Séries de TV");
              }}
            >
              Séries de TV
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setItemselect("collection");
                setItemselect2("Coleções");
              }}
            >
              Coleções
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setItemselect("person");
                setItemselect2("Pessoas");
              }}
            >
              Pessoas
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <input
          type="text"
          onChange={(event) => {
            setInput(event.target.value);
          }}
          placeholder="Pesquise o filme: "
          className="max-sm:text-xl max-hm:h-[6vh] max-hm:p-5 input-x min-h-0 h-[10vh] p-3 outline-none hover:bg-slate-800 hover:text-slate-200 transition ease-in-out duration-500 max-sm:scale-[0.8]"
          value={input}
        />
        <button
          onClick={async () => {
            await handleSearch();
          }}
          className="max-sm:scale-[1.1] max-hm:w-fit max-sm:w-fit bg-slate-900 rounded-lg text-slate-300 p-3 w-[10vw] h-full hover:bg-slate-300 hover:text-slate-900 transition duration-500"
        >
          Pesquisar
        </button>
      </form>

      <div
        className="max-sm:w-[90vw] h-fit flex justify-center items-center"
        style={{ display: `${display}` }}
      >
        {isLoading ? (
          <h1 className="max-sm:w-fit animate-spin rounded-3xl text-slate-100 bg-slate-900 flex flex-row justify-center items-center p-3 gap-4">
            <LuLoader2 className="scale-[1.5] animate-spin max-sm:scale-[2]" />
          </h1>
        ) : array.length === 0 && !hasResults ? (
          <h1 className="max-sm:w-fit text-slate-100 bg-slate-900 flex flex-row justify-center items-center p-3 gap-4">
            Nenhum resultado encontrado...{" "}
            <MdOutlineSearchOff className="scale-[1.7]" />
          </h1>
        ) : (
          <div className="w-[95vw] h-fit z-0">
            <Slider {...settings} className="w-full max-sm:w-[70vw] m-auto">
              {handle_atributtes2()}
            </Slider>
          </div>
        )}
      </div>

      <h1 className="text-2xl text-slate-100 font-bold">Trendings</h1>
      <div className="w-screen h-fit max-sm:w-[80vw]">
        <Slider {...settings2} className="p-1 h-fit">
          {trending.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 z-0 text-left p-5 w-full text-slate-300 h-fit"
            >
              <h1>{item.title}</h1>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt="Poster"
                className="h-[60vh] w-full mt-6 rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    </main>
  );
}

export default Main;
