import {
  Box,
  TextField,
  Button,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import api, { getToken } from "../api/api";
import { styles } from "../styles/globalStyles";

interface ScrollContainerProps<T> {
  paginateUrl: string;
  searchUrl: string;
  returnComponent: React.ComponentType<any>;
  setCurrentValue: (value: T) => void;
  refreshKey: number;
}

function ScrollContainer<T>({
  paginateUrl,
  searchUrl,
  returnComponent: RowComponent,
  setCurrentValue,
  refreshKey,
}: ScrollContainerProps<T>) {
  const scrollContainerRef = useRef(null);
  const [items, setItems] = useState<T[]>();
  const [filtered, setFiltered] = useState<T[]>();
  const [loadOffset, setloadOffset] = useState<number>(0);
  const [totalItems, settotalItems] = useState();
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllCustomer = async () => {
    setLoading(true);

    const returnResponse = await api(
      `${paginateUrl}${loadOffset}`,
      "Get",
      getToken()
    );

    const { result, total } = returnResponse.body;
    if (returnResponse.success) {
      setItems(result);
      settotalItems(total);
      setCurrentValue(result[0]);
    }
    setLoading(false);
  };

  const search = (inputString: string) => {
    setLoading(true);
    setTimeout(async () => {
      if (!inputString) {
        setFiltered(undefined);
      } else {
        setLoading(true);
        const returnResponse = await api(
          `${searchUrl}${inputString}`,
          "Get",
          getToken()
        );

        if (returnResponse.success) {
          setFiltered(returnResponse.body);
        }
      }
      setLoading(false);
    }, 500);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current && !loadingMore) {
      const { scrollHeight, scrollTop, clientHeight } =
        scrollContainerRef.current;

      const atBottom = scrollHeight - scrollTop - clientHeight < 5;

      if (atBottom && items && totalItems && items.length < totalItems) {
        setLoadingMore(true);
        setloadOffset((prev) => prev + 1);
      }
    }
  };

  const loadMore = async (offset: number) => {
    const returnResponse = await api(
      `${paginateUrl}${offset}`,
      "Get",
      getToken()
    );
    const { result } = returnResponse.body;

    if (returnResponse.success && result.length > 0) {
      setItems((prev = []) => [...prev, ...result]);
    }
    setLoadingMore(false);
  };

  useEffect(() => {
    if (loadOffset === 0) return;
    loadMore(loadOffset);
  }, [loadOffset]);

  useEffect(() => {
    getAllCustomer();
  }, [refreshKey]);

  useEffect(() => {
    const scrollElement: any = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      handleScroll();
    }
  }, [totalItems]);

  return (
    <Box sx={styles.sidebar} ref={scrollContainerRef}>
      <Box sx={styles.search}>
        <TextField
          sx={{
            "& .MuiInputBase-input": {
              color: "black", // text color
            },
            width: "100%",
            "&:hover fieldset": {
              borderColor: "black", // hover border color
            },
          }}
          id="outlined-search"
          label="Search Customers"
          type="search"
          onChange={(e) => search(e.target.value)}
        />
      </Box>
      <Box>
        {filtered ? (
          filtered.map((item: any) => (
            <Button key={item.record_id} onClick={(e) => setCurrentValue(item)}>
              <RowComponent {...item} />
            </Button>
          ))
        ) : items && !loading ? (
          items.map((item: any) => (
            <Button key={item.record_id} onClick={(e) => setCurrentValue(item)}>
              <RowComponent {...item} />
            </Button>
          ))
        ) : (
          <CircularProgress />
        )}{" "}
        {loadingMore && <LinearProgress sx={{ width: "100%", marginTop: 1 }} />}
      </Box>
    </Box>
  );
}

export default ScrollContainer;
