import { VscSymbolField } from "react-icons/vsc";
import { TbAmbulance } from "react-icons/tb";
import { PiShieldWarningBold} from "react-icons/pi";
import { SiHackaday } from "react-icons/si";
import { TbZoomMoney } from "react-icons/tb";
import { SlSpeech } from "react-icons/sl";
import { GiMoneyStack } from "react-icons/gi";
import { BiCctv } from "react-icons/bi";
import { RiCustomerService2Line } from "react-icons/ri";
import PropTypes from "prop-types";

export const Tags = (props) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-bold text-2xl">Tags</h3>
        <h4>Select your category</h4>
      </div>

      <div className="Tags grid grid-rows-3 grid-cols-3 h-36 gap-4 w-[50%] text-lg ">
        <label className="flex gap-3 place-items-center border px-3 rounded-md shadow-sm">
          <input
            type="checkbox"
            name="tv"
            checked={props.tags.theft}
            onChange={() => {
              props.settags({ ...props.tags, theft: !props.tags.theft });
            }}
          />
          <BiCctv />
          <p className="font-semibold">Theft</p>
        </label>

        <label className="flex gap-3 place-items-center border px-3 rounded-md shadow-sm">
          <input
            type="checkbox"
            name="radio"
            checked={props.tags.threat}
            onChange={() => {
              props.settags({ ...props.tags, threat: !props.tags.threat });
            }}
          />
          <SiHackaday />
          <p className="font-semibold">Threat</p>
        </label>

        <label className="flex gap-3 place-items-center border px-3 rounded-md shadow-sm">
          <input
            type="checkbox"
            name="parking"
            checked={props.tags.accounthacking}
            onChange={() => {
              props.settags({ ...props.tags, accounthacking: !props.tags.accounthacking });
            }}
          />
          <PiShieldWarningBold/>
          <p className="font-semibold">Account Hacked</p>
        </label>

        <label className="flex gap-3 place-items-center border px-3 rounded-md shadow-sm">
          <input
            type="checkbox"
            name="wifi"
            checked={props.tags.violence}
            onChange={() => {
              props.settags({ ...props.tags, violence: !props.tags.violence });
            }}
          />
          <TbAmbulance/>
          <p className="font-semibold">Violence</p>
        </label>

        <label className="flex gap-3 place-items-center border px-3 rounded-md shadow-sm">
          <input
            type="checkbox"
            name="pets"
            checked={props.tags.property}
            onChange={() => {
              props.settags({ ...props.tags, property: !props.tags.property });
            }}
          />
          <VscSymbolField />
          <p className="font-semibold">Property</p>
        </label>

        <label className="flex gap-3 place-items-center border px-3 rounded-md shadow-sm">
          <input
            type="checkbox"
            name="service"
            checked={props.tags.childmarriage}
            onChange={() => {
              props.settags({ ...props.tags, childmarriage: !props.tags.childmarriage });
            }}
          />
          <RiCustomerService2Line />
          <p className="font-semibold">Child Marriage</p>
        </label>

        <label className="flex gap-3 place-items-center border px-3 rounded-md shadow-sm">
          <input
            type="checkbox"
            name="food"
            checked={props.tags.bribery}
            onChange={() => {
              props.settags({ ...props.tags, bribery: !props.tags.bribery });
            }}
          />
          <GiMoneyStack />
          <p className="font-semibold">Bribery</p>
        </label>

        <label className="flex gap-3 place-items-center border px-3 rounded-md shadow-sm">
          <input
            type="checkbox"
            name="security"
            checked={props.tags.hatespeech}
            onChange={() => {
              props.settags({ ...props.tags, hatespeech: !props.tags.hatespeech });
            }}
          />
          <SlSpeech />
          <p className="font-semibold">Hate Speech</p>
        </label>

        <label className="flex gap-3 place-items-center border px-3 rounded-md shadow-sm">
          <input
            type="checkbox"
            name="entrance"
            checked={props.tags.scam}
            onChange={() => {
              props.settags({ ...props.tags, scam: !props.tags.scam });
            }}
          />
          <TbZoomMoney />
          <p className="font-semibold">Online Scam</p>
        </label>
      </div>
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.shape({
    theft: PropTypes.bool,
    threat: PropTypes.bool,
    accounthacking: PropTypes.bool,
    violence: PropTypes.bool,
    property: PropTypes.bool,
    childmarriage: PropTypes.bool,
    bribery: PropTypes.bool,
    hatespeech: PropTypes.bool,
    scam: PropTypes.bool,
  }).isRequired,
  settags: PropTypes.func.isRequired,
};