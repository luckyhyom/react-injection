// 기존 옵션 react로 변경.
// *객체에 있는 내용을 바꾸지 말고, 객체 자체를 바꾼다. ?
// *컴포넌트는 멍청해야한다?

const {useState,useEffect,useRef} = React;

const TotalOption = ({CAFE24API}) => {
    const [options,setOptions] = useState([]);
    const [selectedOptions,setSelectedOptions] = useState({});
    const [selectedOptionsArr,setSelectedOptionsArr] = useState([]);

    useEffect(()=>{
        test();
    },[])

    const test = () => {
        CAFE24API.get(`/api/v2/products/${productNo}/options`, function (err, res) {
            let optionsData = res.options.options;
            let arrOption = options.concat(optionsData);
            setOptions(arrOption);
        });
    }

    const createCart = () => {
        var data = {
            shop_no: 4,
            request: {
                duplicated_item_check: "F",
                product_no: productNo,
                basket_type: "A0000",
                prefaid_shipping_fee: "P",
                variants: [
                    {
                        quantity: 1,
                        // 상품코드+000A
                        variants_code: productCode + "000A",
                        options: selectedOptionsArr,
                    },
                ],
            },
        };
        CAFE24API.post("/api/v2/carts", data, function (err, res) {
            console.log(res);
            alert("장바구니에 담겼습니다.");
        });
    }

    const addSelectedOption = (option) => {
        const result = {...selectedOptions};
        let key = option["option_code"];

        let regStone = /Stone$/;
        let regMetal = /Metal$/;
        if (regStone.test(option["option_name"])) {
            key = "stone";
        } else if (regMetal.test(option["option_name"])) {
            key = "metal";
        };

        result[key] = option;
        console.log('result:',result);

        setSelectedOptions(result);
        
        // *selectionOptions를 넣으면 초기화가 한박자 늦으므로 result를 이용한다.
        // 객체를 배열로 바꿈
        let arr = [];
        Object.entries(result).forEach(s=>{
            arr.push(s[1])
        })
        console.log('arr',arr);
        setSelectedOptionsArr(arr);
    }

    return (
        <div>
            <div onClick={createCart}>Submit</div>
            {options.map((option,index)=>
                <OptionBox
                    key={index}
                    option={option}
                    onAdd={addSelectedOption}
                />
            )}
        </div>
    )
}


const OptionBox = ({onAdd,option}) => {

    const {option_code,option_name,option_value} = option;

    const addSelectedOption = (option) => {
        onAdd(option);
    }

    return (
        <div className={"optionBox"} optionname={option_name}>
            <div>{option_name}</div>
            {option_value.map((value,index) =>(
                <li key={index}>
                    <Option 
                        onAdd={addSelectedOption}
                        value={value}
                        optionCode={option_code}
                        optionname={option_name}
                    />
                </li> 
            ))}
        </div>
    )
}

const Option = ({onAdd,value,optionCode,optionname}) => {

    const {value_no,additional_amount,option_text} = value;
    const radioRef = useRef();

    const addSelectedOption = () => {
        let flag = radioRef.current.checked;
        if(!flag) return

        const option = {
                "option_code": optionCode,
                "value_no": value_no,
                "option_name":optionname
        }

        onAdd(option);
    }

    return (
        <div onClick={addSelectedOption}>
            <input
                ref={radioRef}
                type="radio"
                name={optionCode}
                id={value_no}
                value_no={value_no}
                additional_amount={additional_amount}
            />
            <label htmlFor={value_no}>{option_text}</label>
        </div>
    )
}


const domContainer = document.querySelector('#root');
ReactDOM.render(<TotalOption CAFE24API={CAFE24API}/>,domContainer);